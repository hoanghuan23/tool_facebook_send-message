import { Injectable } from '@nestjs/common';
import { OpenSearchUtils } from 'src/opensearch/opensearch.service';

@Injectable()
export class RecruitmentService {
    private readonly INDEX_NAME = 'hellojobv5-recruitment-crawled';
    constructor(private readonly openSearchUtils: OpenSearchUtils) { }
    public async findAllRecruitmentApproached() {
        const query = {
            "query": {
                "bool": {
                    "filter": [
                        { "bool": { "must_not": [{ "term": { "isDeleted": true } }] } },
                        { "range": { "createdDate": { "gte": 1767744000000, lt: 1767830400000 } } },
                        { "terms": { "statusJourney.keyword": ["APPROACHED"] } },
                        {
                            "bool": {
                                "must_not": [{ "term": { "sender.keyword": "Người tham gia ẩn danh" } }

                                ]
                            }
                        }
                    ]
                }
            },
            "sort": [{ "postedDate": { "order": "desc" } }],
            "_source": ["id", "statusJourney", "fullName", "visa", "job", "career", "workLocation", "gender", "languageLevel", "specialConditions", "filter", "searchLink", "isDeleted", "sender", "lastViewedTime", "note", "baseContent", "postLink", "senderLink", "zaloNumber", "contact", "broker", "postedDate", "createdDate", "time", "verifiedInfo"]
        };
        return await this.openSearchUtils.search(this.INDEX_NAME, query, 10);
    }

    public async updateCandidateLastViewedTime(candidateId: string) {
        try {
            const lastViewedTime = Date.now();
            await this.openSearchUtils.update(this.INDEX_NAME, candidateId, { lastViewedTime });
            // Revalidate the path to ensure the list is updated
            // revalidateTag(`matching-jobs-${candidateId}`);
            return { success: true, lastViewedTime };
        } catch (error) {
            console.error(`Failed to update status for candidate ${candidateId}:`, error);
            return { success: false, message: 'Cập nhật trạng thái thất bại.' };
        }
    }
}
