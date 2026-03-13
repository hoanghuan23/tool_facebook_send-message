import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenSearchUtils implements OnModuleInit {
    private client: Client;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        // Khởi tạo client từ cấu hình trong .env
        const node = this.configService.get<string>('ELASTICSEARCH_HOST') || 'http://localhost:9200';
        const username = this.configService.get<string>('ELASTICSEARCH_USERNAME') ?? '';
        const password = this.configService.get<string>('ELASTICSEARCH_PASSWORD') ?? '';
        this.client = new Client({
            node,
            auth: {
                username,
                password,
            }
        });
    }

    // 1. Create - Thêm tài liệu mới
    async create(index: string, id: string, body: any) {
        return await this.client.index({
            index,
            id,
            body,
            refresh: true,
        });
    }

    // 2. Read - Lấy tài liệu theo ID
    async getById(index: string, id: string) {
        try {
            const response = await this.client.get({ index, id });
            return response.body._source;
        } catch (error) {
            return null;
        }
    }

    // 3. Update - Cập nhật tài liệu
    async update(index: string, id: string, body: any) {
        return await this.client.update({
            index,
            id,
            body: { doc: body },
            refresh: true,
        });
    }

    // 4. Delete - Xóa tài liệu
    async delete(index: string, id: string) {
        return await this.client.delete({ index, id });
    }

    // 5. Search - Tìm kiếm nâng cao
    async search(index: string, query: any, limit: number = 10) {
        const response = await this.client.search({
            index,
            body: query,
            from: 0,
            size: limit
        });
        return response.body.hits.hits.map(hit => hit._source);
    }
}