import { Injectable } from '@nestjs/common';
import { createMatchingJobForCandidate, createMatchingQueryFromURL, generateJobFilter, initialSearchFilters } from 'src/lib/matching-util';
import { generateBulletJobCrawl, generateHtmlFromMarkdown } from 'src/lib/utils';
import { OpenSearchUtils } from 'src/opensearch/opensearch.service';

@Injectable()
export class JobService {
    private readonly INDEX_NAME = 'hellojobv5-job-crawled';
    constructor(private readonly openSearchUtils: OpenSearchUtils) { }
    public async findMatchingJobs(candidate: any,limit = 3) {
        let searchQuery;
        if (!!candidate.searchLink) {
            const searchParams = new URL(candidate.searchLink.trim()).searchParams;
            const _initialSearchFilters = JSON.parse(JSON.stringify(initialSearchFilters));
            const { newFilters, sortOption, page } = generateJobFilter(await searchParams, _initialSearchFilters);
            _initialSearchFilters.hasForm = true;
            searchQuery = createMatchingQueryFromURL(newFilters, sortOption, candidate.lastViewedTime);
            // console.log(JSON.stringify(searchQuery))
        } else {
            searchQuery = createMatchingJobForCandidate(candidate, candidate.lastViewedTime);
        }
        searchQuery._source = [
            "id",               // Định danh document
            "code",             // Mã công việc hiển thị trên ảnh
            "avatar",           // Ảnh đại diện công việc
            "job",              // Tên công việc (dùng để lấy ảnh mặc định nếu ko có avatar)
            "career",           // Ngành nghề (dùng để lấy ảnh mặc định)
            "visa",             // Thông tin Visa để hiển thị Badge
            "realSalary",       // Lương thực lĩnh
            "basicSalary",             // Thông tin Visa để hiển thị Badge
            "realSalaryCode",       // Lương thực lĩnh
            "basicSalaryCode",      // Lương cơ bản
            "workLocation",     // Địa điểm làm việc
            "interviewDay",     // Ngày phỏng vấn
            "postedDate",       // Ngày đăng (convertTime)
            "time",             // Trường dự phòng cho ngày đăng
            "createdDate",      // Trường dự phòng cho ngày đăng
            "expiredDate",      // Ngày hết hạn để hiển thị trạng thái
            "salerID",          // Để tìm thông tin tư vấn viên (recruiter)
            "source",           // Nguồn gốc (ZALO, FACEBOOK,...) dùng cho Admin logic
            "sender",           // Tên người gửi (hiển thị NameAvatar)
            "formImage",        // Ảnh form đơn hàng
            "formMarkdownArray", // Dùng để generate HTML form
            "specialConditions",
            "fee",
            "back",
            "quantity",
            "numberRecruits",
            "minAge",
            "maxAge",
            "languageLevel",
            "interviewRounds",
            "interviewLocation",
            "interviewFormat",
            "contact",
            "groupLink",
            "postLink",
            "senderLink",
            "groupName",
            "aiContent",
            "nameAscii",
            "formImageHJ"
        ]
        searchQuery.sort = [
            { "createdDate": { "order": "desc" } },
            { "_score": { "order": "desc" } },
        ]
        return await this.openSearchUtils.search(this.INDEX_NAME, searchQuery, limit);
    }

    public async getJobFormImage(imageURL: string) {
        const response = await fetch(imageURL, {
            method: 'GET',
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Lỗi từ server: ${response.status} ${errorText}`);
        }
        const pdfBlob = await response.blob();
        return pdfBlob;
    }
}
