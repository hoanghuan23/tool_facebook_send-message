import { allSpecialConditions, visaMapping } from './visa-data';
import PROVINCES from './provinces.json';
import LANGUAGE_LEVEL from './language_level.json';
import JOBS from './jobs.json';
import { capitalize } from './utils';

export const JOB_MATCHING_KEYWORDS: { [key: string]: string[] } = {
  'nhóm ngành 1': [
    'Đúc kim loại màu',
    'Đúc khuôn',
    'Ép dập kim loại',
    'Kim loại tấm',
    'Rèn',
    'Thi công kết cấu thép',
    'Gia công cơ khí',
    'Gia công tinh',
    'Đúc nhựa',
    'Hàn',
    'Sơn',
    'Lắp ráp thiết bị điện khí',
    'Kiểm tra máy móc',
    'Bảo trì máy móc',
    'Đóng gói công nghiệp',
  ],
  'nhóm ngành 2': [
    'Đúc kim loại',
    'Đúc khuôn',
    'Dập kim loại',
    'Kim loại tấm',
    'Rèn',
    'Chế tạo vật liệu thép',
    'Gia công cơ khí',
    'Gia công tinh/ gia công hoàn thiện',
    'Đúc nhựa',
    'Hàn',
    'Sơn',
    'Điện khí',
    'Kiểm tra máy',
    'Bảo dưỡng máy',
    'Đóng gói công nghiệp',
    '鋳造',
    'ダイカスト',
    '金属プレス',
    '工場板金',
    '鍛造',
    '鉄工',
    '機械加工',
    '仕上げ加工',
    'プラスチック成形',
    '溶接',
    '塗装',
    '電気機器組み立て',
    '機械検査',
    '機械保全',
    '工業包装',
    'Chūzō',
    'Daikasuto',
    'Kinzoku puresu',
    'Kōjō bankin',
    'Tanzō',
    'Tekko',
    'Kikai kakō',
    'Shiage kako',
    'Purasuchikku seikei',
    'Yōsetsu',
    'Tosō',
    'Denki kiki kumitate',
    'Kikai kensa',
    'Kikai hozen',
    'Kōgyō hōsō',
  ],
  'nhóm ngành 3': [
    'Mạ',
    'Anod nhôm',
    'めっき',
    'アルミニウム陽極酸化処理',
    'Kikai kakō',
    'Shiage kako',
    'Purasuchikku seikei',
    'Denki kiki kumitate',
    'Denshi kiki kumitate',
    'Purinto haisenban',
    'Kikai kensa',
    'Kikai hozen',
    'Kōgyō hōsō',
  ],
  'nhóm ngành xây dựng 1': [
    'Khoan giếng (Percussion)',
    'Khoan giếng (Rotary)',
    'Thi công ván khuôn',
    'Thi công cốt thép',
    'Giàn giáo',
    'Bơm ép bê tông',
    'Thi công Wellpoint',
    'Máy xây dựng - San ủi / San nền',
    'Máy xây dựng - Bốc xếp',
    'Máy xây dựng - Đào xúc',
    'Máy xây dựng - Đầm nén',
    'Gia công kết cấu thép',
    'Sơn xây dựng',
    'Sơn cầu thép',
    'Hàn thủ công',
    'Hàn bán tự động',
    'パーカッション式さく井工事作業',
    'ロータリー式さく井工事作業',
    '型枠工事作業',
    '鉄筋組立て作業',
    'とび作業',
    'コンクリート圧送工事作業',
    'ウェルポイント工事作業',
    '押土・整地作業',
    '積込み作業',
    '掘削作業',
    '締固め作業',
    '構造物鉄工作業',
    '建築塗装作業',
    '鋼橋塗装作業',
    '手溶接',
    '半自動溶接',
    'Paakasshon-shiki saku i kōji sagyō',
    'Rōtarī-shiki saku i kōji sagyō',
    'Katawaku kōji sagyō',
    'Tekkin kumitate sagyō',
    'Tobi sagyō',
    'Konkuriito assō kōji sagyō',
    'Werupointo kōji sagyō',
    'Osudo / seichi sagyō',
    'Tsumikomi sagyō',
    'Kussaku sagyō',
    'Shimekatame sagyō',
    'Kōzōbutsu tekkō sagyō',
    'Kenchiku tosō sagyō',
    'Kōkyō tosō sagyō',
    'Te yōsetsu',
    'Han jidō yōsetsu',
  ],
  'nhóm ngành xây dựng 2': [
    'Tôn mái, ốp kim loại',
    'Ống gió, ống dẫn',
    'Chế tác cửa gỗ',
    'Mộc xây dựng',
    'Thi công ván khuôn',
    'Thi công cốt thép',
    'Giàn giáo',
    'Gia công đá',
    'Ốp lát đá',
    'Ốp lát gạch',
    'Lợp ngói',
    'Trát vữa',
    'Hoàn thiện nội thất - Sàn nhựa',
    'Hoàn thiện nội thất - Sàn thảm',
    'Hoàn thiện nội thất - Khung thép',
    'Hoàn thiện nội thất - Tấm trần',
    'Hoàn thiện nội thất - Rèm cửa',
    'Trang trí tường (giấy dán)',
    'Thi công cửa nhôm kính',
    'Chống thấm',
    'Bơm ép bê tông',
    'Xây lò công nghiệp',
    '内外装板金作業',
    'ダクト板金作業',
    '木製建具手加工作業',
    '大工工事作業',
    '型枠工事作業',
    '鉄筋組立て作業',
    'とび作業',
    '石材加工作業',
    '石張り作業',
    'タイル張り作業',
    'かわらぶき作業',
    '左官作業',
    'プラスチック系床仕上げ工事作業',
    'カーペット系床仕上げ工事作業',
    '鋼製下地工事作業',
    'ボード仕上げ工事作業',
    'カーテン工事作業',
    '壁装作業',
    'ビル用サッシ施工作業',
    'シーリング防水工事作業',
    'コンクリート圧送工事作業',
    '築炉作業',
    'Naigaisō bankin sagyō',
    'Dakuto bankin sagyō',
    'Mokusei tategu te kako sagyō',
    'Daiku kōji sagyō',
    'Katawaku kōji sagyō',
    'Tekkin kumitate sagyō',
    'Tobi sagyō',
    'Sekizai kakō sagyō',
    'Ishibari sagyō',
    'Tairu bari sagyō',
    'Kawarabuki sagyō',
    'Sakan sagyō',
    'Purasuchikku-kei yuka shiage kōji sagyō',
    'Kāpetto-kei yuka shiage kōji sagyō',
    'Kōsei shitaji kōji sagyō',
    'Bōdo shiage kōji sagyō',
    'Kāten kōji sagyō',
    'Hekisō sagyō',
    'Biru-yō sasshi seko sagyō',
    'Shīringu bōsui kōji sagyō',
    'Konkuriito assō kōji sagyō',
    'Chikuro sagyō',
  ],
  'nhóm ngành xây dựng 3': [
    'Tôn mái, ốp kim loại',
    'Ống gió, ống dẫn',
    'Lắp đặt máy lạnh - điều hòa',
    'Lắp đặt đường ống xây dựng',
    'Lắp đặt đường ống nhà máy',
    'Cách nhiệt - bảo ôn',
    'Hàn thủ công',
    'Hàn bán tự động',
    '内外装板金作業',
    'ダクト板金作業',
    '冷凍空気調和機器施工作業',
    '建築配管作業',
    'プラント配管作業',
    '保温保冷工事作業',
    '手溶接',
    '半自動溶接',
    'Naigaisō bankin sagyō',
    'Dakuto bankin sagyō',
    'Reitō kūki chōwa kiki seko sagyō',
    'Kenchiku haikan sagyō',
    'Puranto haikan sagyō',
    'Ho-on horei kōji sagyō',
    'Te yōsetsu',
    'Han jidō yōsetsu',
  ],
  'tấm thép nhà xưởng': ['thép', 'xưởng'],
  'dập kim loại': ['dập', 'kim loại'],
  'đóng gói công nghiệp': ['đóng gói', 'cơ khí'],
  'đóng gói linh kiện': ['đóng gói', 'điện tử'],
  'linh kiện ô tô': ['ô tô', 'linh kiện'],
  'bếp viện': ['nhà hàng', 'dưỡng lão'],
  'hoàn thiện nội thất': ['xây dựng', 'nội thất'],
  'tấm thép xây dựng': ['thép', 'xây dựng'],
};
export const createMatchingJobForCandidate = (
  candidate: any,
  lastViewedTime: number | null,
) => {
  try {
    const {
      visa,
      career,
      job,
      workLocation,
      languageLevel,
      specialConditions,
      gender,
      dateOfBirth,
      filter,
    } = candidate;

    const searchQuery: any = {
      query: {
        bool: {
          filter: [
            {
              range: {
                createdDate: {
                  gte: 1762502844446,
                },
              },
            },
            {
              exists: {
                field: 'visa',
              },
            },
            {
              exists: {
                field: 'aiContent',
              },
            },
            {
              exists: {
                field: 'job',
              },
            },
            {
              exists: {
                field: 'career',
              },
            },
            {
              term: {
                'country.keyword': 'Nhật Bản',
              },
            },
            {
              exists: {
                field: 'createdDate',
              },
            },
            {
              bool: {
                must_not: [{ term: { isClosed: true } }],
              },
            },
            {
              range: {
                expiredDate: {
                  gte: Date.now(),
                },
              },
            },
            {
              exists: {
                field: 'formMarkdownArray',
              },
            },
          ],
          must: [],
          should: [],
        },
      },
    };
    if (!!lastViewedTime) {
      searchQuery.query.bool.filter.push({
        range: {
          createdDate: {
            gte: lastViewedTime,
          },
        },
      });
    }

    // chỉ lấy những đơn còn hạn
    searchQuery.query.bool.filter.push({
      range: {
        expiredDate: {
          gte: Date.now(),
        },
      },
    });

    // chỉ lấy những đơn có form đẹp
    searchQuery.query.bool.filter.push({
      exists: {
        field: 'formMarkdownArray',
      },
    });

    const conditionFilters: any[] = [];
    const conditionMust: any[] = [];
    // Lọc theo visa
    if (!!visa) {
      conditionFilters.push({
        term: {
          'visa.keyword': visa,
        },
      });
    }
    // với trường hợp visa TTS 3 năm và 1 năm thì yêu cầu ngày phỏng vấn phù hợp hoặc không có ngày phỏng vấn
    if (['Thực tập sinh 3 năm', 'Thực tập sinh 1 năm'].includes(visa ?? '')) {
      conditionFilters.push({
        bool: {
          should: [
            {
              range: {
                interviewDay: {
                  gte: 'now',
                  format: 'dd/MM/yyyy',
                },
              },
            },
            {
              bool: {
                must_not: {
                  exists: { field: 'interviewDay' },
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      });
    }

    // Lọc theo ngành nghề và công việc chi tiết
    if (!!filter?.job || !!filter?.career) {
      const jobObj = filter?.job;
      const jobCodeArr = jobObj?.valueArr;
      let should: any[] = [];
      if (jobCodeArr?.length === 5) {
        should.push({ term: { 'filter.job.value.keyword': job } });
        should.push({
          prefix: {
            'filter.job.value.keyword': `${jobCodeArr[0]}.${jobCodeArr[1]}.${jobCodeArr[2]}.${jobCodeArr[3]}.`,
          },
        });
        should.push({
          prefix: {
            'filter.job.value.keyword': `${jobCodeArr[0]}.${jobCodeArr[1]}.${jobCodeArr[2]}.`,
          },
        });
        // should.push({ prefix: { "filter.job.value.keyword": `${jobCodeArr[0]}.${jobCodeArr[1]}.` } });
      } else {
        if (!!job) {
          should.push({ term: { 'career.keyword': jobObj?.label } });
          should.push({ term: { 'job.keyword': jobObj?.label } });
          // should.push({ match: { career: job } });
          // should.push({ match: { job: job } });
        } else if (!!career) {
          should.push({ term: { 'career.keyword': career } });
          should.push({ term: { 'job.keyword': career } });
          // should.push({ match: { career: career } });
          // should.push({ match: { job: career } });
        }
      }
      conditionMust.push({
        bool: {
          should: should,
          minimum_should_match: 1,
        },
      });
    }

    // Lọc theo vùng/tỉnh
    if (!!workLocation && workLocation.length > 0) {
      const locationLabels = workLocation
        ?.split(/[;,]/)
        ?.map((item: string) => item.trim())
        ?.filter((item: string) => {
          const found = PROVINCES.find((p) => p.value === item);
          return !!found;
        });
      if (locationLabels?.length > 0) {
        const shouldLocation: any = [
          {
            bool: {
              must_not: {
                exists: { field: 'workLocation' },
              },
            },
          },
        ];
        locationLabels.forEach((location: string) => {
          if (!!location && location.trim() !== 'empty') {
            shouldLocation.push({
              match: { workLocation: capitalize(location.trim()) },
            });
          }
        });
        conditionMust.push({
          bool: {
            should: shouldLocation,
            minimum_should_match: 1,
          },
        });
      }
    }

    // Lọc theo điều kiện đặc biệt
    if (!!specialConditions && specialConditions.length > 0) {
      conditionFilters.push({
        terms: {
          specialConditions: specialConditions,
        },
      });
    }

    // Lọc theo điều kiện tuổi
    if (dateOfBirth && !isNaN(dateOfBirth)) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - dateOfBirth;
      conditionFilters.push({
        bool: {
          should: [
            {
              range: {
                'filter.minAge': {
                  lte: age,
                },
              },
            },
            {
              bool: {
                must_not: {
                  exists: { field: 'filter.minAge' },
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      });
      conditionFilters.push({
        bool: {
          should: [
            {
              range: {
                'filter.maxAge': {
                  gte: age,
                },
              },
            },
            {
              bool: {
                must_not: {
                  exists: { field: 'filter.maxAge' },
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      });
    }

    // Lọc theo trình độ ngoại ngữ
    if (!!languageLevel && languageLevel.length > 0) {
      const level = LANGUAGE_LEVEL.find(
        (level) => level.name === languageLevel,
      );
      if (!!level) {
        const levels = LANGUAGE_LEVEL.filter(
          (lv) => lv.level <= level.level,
        ).map((lv) => lv.name);
        conditionMust.push({
          terms: {
            'languageLevel.keyword': levels,
          },
        });
      }
    }

    // Lọc theo giới tính
    if (!!gender && gender.length > 0) {
      let genderValues: string[] = [];
      if (gender === 'MALE') {
        genderValues = ['MALE', 'NAM', 'BOTH'];
      } else if (gender === 'FEMALE') {
        genderValues = ['FEMALE', 'NỮ', 'NU', 'BOTH'];
      } else if (gender === 'BOTH') {
        genderValues = ['Cả nam và nữ', 'CẢ NAM VÀ NỮ', 'BOTH'];
      }
      let shouldClauses: any[] = [];
      if (genderValues.length > 0) {
        shouldClauses.push({ terms: { 'gender.keyword': genderValues } });
      }
      // shouldClauses.push({
      //     bool: { must_not: { exists: { field: "gender" } } },
      // });
      if (shouldClauses.length > 0) {
        conditionFilters.push({
          bool: {
            should: shouldClauses,
            minimum_should_match: 1,
          },
        });
      }
    }
    searchQuery.query.bool.filter.push(...conditionFilters);
    searchQuery.query.bool.must.push(...conditionMust);
    return searchQuery;
  } catch (error) {}
  return null;
};
export const createMatchingQueryFromURL = (
  filter: SearchFilters,
  sortOption: string | null,
  lastViewedTime: number | null,
) => {
  const {
    q,
    visaDetail,
    career,
    workLocation,
    job,
    gender,
    age,
    languageRequirement,
    specialConditions,
    suggestionType,
    showExpired,
    sortExpiredToEnd,
    hasForm,
  } = filter;
  const searchQuery: any = {
    query: {
      bool: {
        filter: [
          {
            range: {
              createdDate: {
                gte: 1762502844446,
              },
            },
          },
          {
            exists: {
              field: 'visa',
            },
          },
          {
            exists: {
              field: 'aiContent',
            },
          },
          {
            exists: {
              field: 'job',
            },
          },
          {
            exists: {
              field: 'career',
            },
          },
          {
            term: {
              'country.keyword': 'Nhật Bản',
            },
          },
          {
            exists: {
              field: 'createdDate',
            },
          },
          {
            bool: {
              must_not: [{ term: { isClosed: true } }],
            },
          },
        ],
        must: [],
        should: [],
      },
    },
  };
  if (!!lastViewedTime) {
    searchQuery.query.bool.filter.push({
      range: {
        createdDate: {
          gte: lastViewedTime,
        },
      },
    });
  }

  if (!!q && q.length > 0) {
    const condition: any[] = [];
    const arr = q.split(';') ?? [];
    for (let i = 0; i < arr.length; i++) {
      const keyword = arr[i].toLowerCase().trim();
      if (!!JOB_MATCHING_KEYWORDS[keyword]) {
        const subConditions: any[] = [];
        for (
          let subIndex = 0;
          subIndex < JOB_MATCHING_KEYWORDS[keyword].length;
          subIndex++
        ) {
          const subKeyword = JOB_MATCHING_KEYWORDS[keyword][subIndex];
          subConditions.push(
            {
              match_phrase: {
                aiContent: {
                  query: subKeyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                baseContent: {
                  query: subKeyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                matchingContent: {
                  query: subKeyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                'formMarkdownArray.noiDung': {
                  query: subKeyword.trim(),
                },
              },
            },
          );
        }
        condition.push({
          bool: {
            should: subConditions,
            minimum_should_match: 1,
          },
        });
      }
      condition.push({
        bool: {
          should: [
            {
              match_phrase: {
                aiContent: {
                  query: keyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                baseContent: {
                  query: keyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                matchingContent: {
                  query: keyword.trim(),
                },
              },
            },
            {
              match_phrase: {
                'formMarkdownArray.noiDung': {
                  query: keyword.trim(),
                },
              },
            },
          ],
          minimum_should_match: 1,
          boost: 100,
        },
      });
    }

    searchQuery.query.bool.must.push({
      bool: {
        should: condition,
        minimum_should_match: 1,
      },
    });
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const twelveHoursAgo = now - 0.5 * day;
    const oneDaysAgo = now - 1 * day;
    const twoDaysAgo = now - 2 * day;
    const threeDaysAgo = now - 3 * day;
    const sevenDaysAgo = now - 7 * day;
    searchQuery.query.bool.must.push({
      bool: {
        should: [
          {
            range: {
              postedDate: {
                gte: Math.round(twelveHoursAgo / 1000),
                boost: 70,
              },
            },
          },
          {
            range: {
              postedDate: {
                gte: Math.round(oneDaysAgo / 1000),
                boost: 60,
              },
            },
          },
          {
            range: {
              postedDate: {
                gte: Math.round(twoDaysAgo / 1000),
                boost: 50,
              },
            },
          },
          {
            range: {
              postedDate: {
                gte: Math.round(threeDaysAgo / 1000),
                boost: 40,
              },
            },
          },
          {
            range: {
              postedDate: {
                gte: Math.round(sevenDaysAgo / 1000),
                boost: 30,
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    });
    searchQuery.query.bool.filter.push({
      range: {
        expiredDate: {
          gte: Date.now(),
        },
      },
    });
  } else {
    const sort: any[] = [];
    switch (sortOption) {
      case 'salary_desc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'desc',
            script: {
              source: `
        if (doc['basicSalary'].size() == 0 || doc['basicSalary'].value == 0) {
          return -1;
        }
        return doc['basicSalary'].value;
      `,
            },
          },
        });
        break;
      }
      case 'salary_asc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'asc',
            script: {
              source: `
        if (doc['basicSalary'].size() == 0 || doc['basicSalary'].value == 0) {
          return 99999999;
        }
        return doc['basicSalary'].value;
      `,
            },
          },
        });
        break;
      }
      case 'net_salary_desc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'desc',
            script: {
              source: `
        if (doc['realSalary'].size() == 0 || doc['realSalary'].value == 0) {
          return -1;
        }
        return doc['realSalary'].value;
      `,
            },
          },
        });
        break;
      }
      case 'net_salary_asc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'asc',
            script: {
              source: `
        if (doc['realSalary'].size() == 0 || doc['realSalary'].value == 0 || doc['fee'].value >20000 || doc['fee'].value <100) {
          return 99999999;
        }
        return doc['realSalary'].value;
      `,
            },
          },
        });
        break;
      }
      case 'fee_desc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'desc',
            script: {
              source: `
        if (doc['fee'].size() == 0 || doc['fee'].value == 0 || doc['fee'].value >20000 || doc['fee'].value <100) {
          return -1;
        }
        return doc['fee'].value;
      `,
            },
          },
        });
        break;
      }
      case 'fee_asc': {
        sort.push({
          _script: {
            type: 'number',
            order: 'asc',
            script: {
              source: `
        if (doc['fee'].size() == 0 || doc['fee'].value == 0) {
          return 99999999;
        }
        return doc['fee'].value;
      `,
            },
          },
        });
        break;
      }
      case 'interview_date_asc': {
        sort.push({
          interviewDay: {
            order: 'asc',
            missing: '_last',
          },
        });
        break;
      }
      case 'interview_date_desc': {
        sort.push({
          interviewDay: {
            order: 'desc',
            missing: '_last',
          },
        });
        break;
      }
      case 'newest':
      default: {
        // sort.push({ "_score": { "order": "desc" } });
        sort.push({ postedDate: { order: 'desc' } });
        break;
      }
    }
    if (showExpired) {
      if (sortExpiredToEnd) {
        sort.push({
          _script: {
            type: 'number',
            order: 'asc',
            script: {
              source: `
            def now = new Date().getTime();
            if (doc['expiredDate'].size() == 0) return 0;
            long exp = doc['expiredDate'].value;
            return now > exp ? 1 : 0;
          `,
            },
          },
        });
      }
    } else {
      searchQuery.query.bool.filter.push({
        range: {
          expiredDate: {
            gte: Date.now(),
          },
        },
      });
    }
    searchQuery.sort = sort;
  }
  if (hasForm) {
    searchQuery.query.bool.filter.push({
      exists: {
        field: 'formMarkdownArray',
      },
    });
  }
  const conditionFilters: any[] = [];
  const conditionMust: any[] = [];
  if (
    !!visaDetail &&
    visaDetail !== 'all-details' &&
    visaDetail !== '' &&
    visaDetail !== 'all'
  ) {
    const visaLabel =
      visaMapping[visaDetail as keyof typeof visaMapping] ?? visaDetail;
    conditionFilters.push({
      term: {
        'visa.keyword': visaLabel?.replace(', tri thức', ''),
      },
    });
  }
  if (
    ['thực tập sinh 3 năm', 'thực tập sinh 1 năm'].includes(visaDetail ?? '')
  ) {
    conditionFilters.push({
      bool: {
        should: [
          {
            range: {
              interviewDay: {
                gte: 'now',
                format: 'dd/MM/yyyy',
              },
            },
          },
          {
            bool: {
              must_not: {
                exists: { field: 'interviewDay' },
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    });
  }
  if ((!!career && career !== 'all') || (!!job && job !== 'all-details')) {
    const jobObj = JOBS.find((j) => j.value === job);
    const jobCodeArr = jobObj?.valueArr;
    let should: any[] = [];
    if (jobCodeArr?.length === 5) {
      should.push({
        term: { 'filter.job.value.keyword': { value: job, boost: 5 } },
      });
      if (suggestionType !== 'accurate') {
        should.push({
          prefix: {
            'filter.job.value.keyword': {
              value: `${jobCodeArr[0]}.${jobCodeArr[1]}.${jobCodeArr[2]}.${jobCodeArr[3]}.`,
              boost: 3,
            },
          },
        });
        should.push({
          prefix: {
            'filter.job.value.keyword': {
              value: `${jobCodeArr[0]}.${jobCodeArr[1]}.${jobCodeArr[2]}.`,
              boost: 1,
            },
          },
        });
      }
      // should.push({ prefix: { "filter.job.value.keyword": `${jobCodeArr[0]}.${jobCodeArr[1]}.` } });
    } else {
      if (!!job) {
        should.push({
          term: {
            'career.keyword': {
              value: jobObj?.label,
              boost: 1,
            },
          },
        });
        should.push({
          term: {
            'job.keyword': {
              value: jobObj?.label,
              boost: 3,
            },
          },
        });
        // should.push({ match: { career: job } });
        // should.push({ match: { job: job } });
      } else if (!!career) {
        should.push({
          term: {
            'career.keyword': {
              value: career,
              boost: 1,
            },
          },
        });
        should.push({
          term: {
            'job.keyword': {
              value: career,
              boost: 3,
            },
          },
        });
        // should.push({ match: { career: career } });
        // should.push({ match: { job: career } });
      }
    }
    conditionMust.push({
      bool: {
        should: should,
        minimum_should_match: 1,
      },
    });
  }

  if (!!workLocation && workLocation.length > 0) {
    const shouldLocation: any = [
      {
        bool: {
          must_not: {
            exists: { field: 'workLocation' },
          },
        },
      },
    ];
    workLocation.forEach((location: string) => {
      if (!!location && location.trim() !== 'empty') {
        shouldLocation.push({
          match: { workLocation: capitalize(location.trim()) },
        });
      }
    });
    conditionMust.push({
      bool: {
        should: shouldLocation,
        minimum_should_match: 1,
      },
    });
  }
  if (!!specialConditions && specialConditions.length > 0) {
    conditionFilters.push({
      terms: {
        specialConditions: specialConditions,
      },
    });
  }
  if (!!gender && gender.length > 0) {
    let genderValues: string[] = [];
    let shouldClauses: any[] = [];
    if (gender === 'vo-chong') {
      shouldClauses.push(
        {
          match_phrase: {
            aiContent: {
              query: 'vợ chồng',
              slop: 2,
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'vo chong',
              slop: 2,
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'v/c',
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'vc',
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'v.c',
            },
          },
        },
      );
    } else if (gender === 'cap-doi') {
      shouldClauses.push(
        {
          match_phrase: {
            aiContent: {
              query: 'cặp đôi',
              slop: 2,
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'cap doi',
              slop: 2,
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'c.đôi',
            },
          },
        },
        {
          match_phrase: {
            aiContent: {
              query: 'c/đôi',
            },
          },
        },
      );
    } else if (gender === 'nam') {
      genderValues = ['MALE', 'NAM', 'BOTH'];
      shouldClauses.push({ terms: { 'gender.keyword': genderValues } });
    } else if (gender === 'nu') {
      genderValues = ['FEMALE', 'NỮ', 'NU', 'BOTH'];
      shouldClauses.push({ terms: { 'gender.keyword': genderValues } });
    }
    // shouldClauses.push({
    //     bool: { must_not: { exists: { field: "gender" } } },
    // });
    if (shouldClauses.length > 0) {
      conditionFilters.push({
        bool: {
          should: shouldClauses,
          minimum_should_match: 1,
        },
      });
    }
  }
  if (age && age.length === 2) {
    conditionFilters.push({
      bool: {
        should: [
          {
            range: {
              'filter.minAge': {
                lte: age[0],
              },
            },
          },
          {
            bool: {
              must_not: {
                exists: { field: 'filter.minAge' },
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    });
    conditionFilters.push({
      bool: {
        should: [
          {
            range: {
              'filter.maxAge': {
                lte: age[1],
              },
            },
          },
          {
            bool: {
              must_not: {
                exists: { field: 'filter.maxAge' },
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    });
  }
  if (!!languageRequirement && languageRequirement.length > 0) {
    const level = LANGUAGE_LEVEL.find(
      (level) => level.slug === languageRequirement,
    );
    if (!!level) {
      const levels = LANGUAGE_LEVEL.filter((lv) => lv.level <= level.level).map(
        (lv) => lv.name,
      );
      conditionMust.push({
        terms: {
          'languageLevel.keyword': levels,
        },
      });
    }
  }
  Object.keys(filter).forEach((key) => {
    // Bỏ qua các trường đặc biệt đã xử lý ở trên
    if (
      [
        'visa',
        'visaDetail',
        'workLocation',
        'specialConditions',
        'career',
        'job',
        'gender',
        'age',
        'interviewDateType',
        'q',
        'height',
        'realSalary',
        'basicSalary',
        'netFee',
        'interviewLocation',
        'suggestionType',
        'languageRequirement',
        'tattooRequirement',
        'weight',
      ].includes(key)
    )
      return;

    const value = filter[key as keyof SearchFilters];
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === 'all' ||
      (Array.isArray(value) && value.length === 0)
    )
      return;
    if (Array.isArray(value)) {
      conditionFilters.push({
        terms: {
          [`filter.${key}.keyword`]: value,
        },
      });
    } else if (typeof value === 'string') {
      conditionFilters.push({
        term: {
          [`filter.${key}.keyword`]: value,
        },
      });
    }
  });
  searchQuery.query.bool.filter.push(...conditionFilters);
  searchQuery.query.bool.must.push(...conditionMust);
  // delete searchQuery.sort
  return searchQuery;
};

export type SearchFilters = {
  q?: string;
  visa?: string;
  visaDetail?: string;
  career?: string;
  workLocation?: string[];
  interviewLocation?: string;
  job?: string;
  experienceRequirement?: string;
  gender?: 'nam' | 'nu' | 'vo-chong' | 'cap-doi' | '';
  height?: [number, number];
  weight?: [number, number];
  age?: [number, number];
  basicSalary?: string;
  realSalary?: string;
  hourlySalary?: string;
  annualIncome?: string;
  annualBonus?: string;
  interviewDate?: string;
  interviewDateType?: 'until' | 'exact' | 'from';
  specialConditions?: string[];
  languageRequirement?: string;
  englishRequirement?: string;
  educationRequirement?: string;
  yearsOfExperience?: string;
  tattooRequirement?: string;
  netFee?: string;
  netFeeNoTicket?: string;
  numberRecruits?: string;
  interviewRounds?: string;
  visionRequirement?: string;
  dominantHand?: string;
  otherSkillRequirement?: string[];
  companyArrivalTime?: string;
  workShift?: string;
  suggestionType?: 'accurate' | 'related';
  showExpired?: boolean;
  hasForm?: boolean;
  // hasNiceForm?: boolean;
  sortExpiredToEnd?: boolean;
};

export const initialSearchFilters: SearchFilters = {
  q: '',
  visa: '',
  visaDetail: 'all',
  career: '',
  workLocation: [],
  interviewLocation: '',
  job: '',
  experienceRequirement: '',
  gender: '',
  height: [135, 210],
  weight: [35, 120],
  age: [18, 70],
  basicSalary: '',
  realSalary: '',
  hourlySalary: '',
  annualIncome: '',
  annualBonus: '',
  specialConditions: [],
  languageRequirement: '',
  englishRequirement: '',
  educationRequirement: '',
  yearsOfExperience: '',
  tattooRequirement: '',
  netFee: '',
  netFeeNoTicket: '',
  numberRecruits: '',
  interviewRounds: '',
  interviewDate: '',
  interviewDateType: 'until',
  visionRequirement: 'all',
  dominantHand: '',
  otherSkillRequirement: [],
  companyArrivalTime: '',
  workShift: '',
  showExpired: true,
  sortExpiredToEnd: true,
  hasForm: true,
};

export const keyMap: { [key: string]: string } = {
  q: 'q',
  visa: 'loai-visa',
  visaDetail: 'chi-tiet-loai-hinh-visa',
  career: 'nganh-nghe',
  workLocation: 'dia-diem',
  interviewLocation: 'dia-diem-phong-van',
  job: 'chi-tiet-cong-viec',
  gender: 'gioi-tinh',
  age: 'do-tuoi',
  height: 'chieu-cao',
  weight: 'can-nang',
  basicSalary: 'luong-co-ban',
  netSalary: 'luong-thuc-linh',
  hourlySalary: 'luong-gio',
  annualIncome: 'thu-nhap-nam',
  annualBonus: 'thuong-nam',
  specialConditions: 'dieu-kien-dac-biet',
  languageRequirement: 'yeu-cau-tieng-nhat',
  englishRequirement: 'yeu-cau-tieng-anh',
  educationRequirement: 'hoc-van',
  experienceRequirement: 'yeu-cau-kinh-nghiem',
  yearsOfExperience: 'so-nam-kinh-nghiem',
  tattooRequirement: 'hinh-xam',
  netFee: 'muc-phi',
  netFeeNoTicket: 'muc-phi-khong-ve',
  quantity: 'so-luong',
  interviewRounds: 'so-vong-phong-van',
  interviewDate: 'ngay-phong-van',
  interviewDateType: 'loai-ngay-phong-van',
  visionRequirement: 'yeu-cau-thi-luc',
  dominantHand: 'tay-thuan',
  otherSkillRequirement: 'yeu-cau-ky-nang-khac',
  companyArrivalTime: 'thoi-diem-ve-cong-ty',
  workShift: 'ca-lam-viec',
  sortBy: 'sap-xep',
  showExpired: 'hien-thi-het-han',
  sortExpiredToEnd: 'het-han-xuong-duoi',
  hasForm: 'co-form-don',
  // hasNiceForm: 'form-don-dep'
};

export const sortOptionMap: { [key: string]: string } = {
  newest: 'moi-nhat',
  salary_desc: 'luong-co-ban-cao-den-thap',
  salary_asc: 'luong-co-ban-thap-den-cao',
  net_salary_desc: 'thuc-linh-cao-den-thap',
  net_salary_asc: 'thuc-linh-thap-den-cao',
  fee_asc: 'phi-thap-den-cao',
  fee_desc: 'phi-cao-den-thap',
  interview_date_asc: 'phong-van-gan-nhat',
  interview_date_desc: 'phong-van-xa-nhat',
  // has_image: 'uu-tien-co-anh',
  // has_video: 'uu-tien-co-video',
  // hot: 'hot-nhat',
  // most_applicants: 'nhieu-nguoi-ung-tuyen',
};

const reverseKeyMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(keyMap).map(([key, value]) => [value, key]),
);
const reverseSortOptionMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(sortOptionMap).map(([key, value]) => [value, key]),
);

export const generateJobFilter = (
  readOnlySearchParams: any,
  _initialSearchFilters: any = initialSearchFilters,
) => {
  const newFilters: SearchFilters = {
    ..._initialSearchFilters,
    workLocation: [],
    specialConditions: [],
    otherSkillRequirement: [],
  };
  let sortOption = 'newest';
  let page = 1;
  let entries: any = null;
  try {
    entries = readOnlySearchParams.entries();
  } catch (error) {
    entries = Object.entries(readOnlySearchParams);
  }
  for (const [key, value] of entries) {
    const internalKey: string = reverseKeyMap[key] || key;
    if (internalKey === 'sortBy') {
      sortOption = reverseSortOptionMap[value] || 'newest';
    } else if (
      internalKey === 'workLocation' ||
      internalKey === 'otherSkillRequirement'
    ) {
      const currentValues =
        newFilters[internalKey as 'workLocation' | 'otherSkillRequirement'] ||
        [];
      // @ts-ignore
      if (Array.isArray(value)) {
        newFilters[internalKey as 'workLocation' | 'otherSkillRequirement'] = [
          ...currentValues,
          ...value,
        ];
      } else {
        newFilters[internalKey as 'workLocation' | 'otherSkillRequirement'] = [
          ...currentValues,
          value,
        ];
      }
    } else if (
      internalKey === 'age' ||
      internalKey === 'height' ||
      internalKey === 'weight'
    ) {
      const values = readOnlySearchParams.getAll(key);
      if (values.length === 2) {
        // @ts-ignore
        newFilters[internalKey] = [
          parseInt(values[0], 10),
          parseInt(values[1], 10),
        ];
      }
    } else if (internalKey === 'specialConditions') {
      const values = Array.isArray(value) ? value : [value];
      const conditionNames = values
        .map((v) => allSpecialConditions.find((c) => c.slug === v)?.name)
        .filter(Boolean) as string[];
      newFilters.specialConditions = [
        ...(newFilters.specialConditions || []),
        ...conditionNames,
      ];
    } else if (internalKey === 'page') {
      page = parseInt(value, 10) || 1;
    } else if (
      internalKey === 'showExpired' ||
      internalKey === 'sortExpiredToEnd' ||
      internalKey === 'hasForm'
    ) {
      if (internalKey in newFilters) {
        newFilters[internalKey] = JSON.parse(
          value?.toLocaleLowerCase() ?? 'true',
        );
      }
    } else {
      if (internalKey in newFilters) {
        // @ts-ignore
        newFilters[internalKey] = value;
      }
    }
  }
  return { sortOption, newFilters, page };
};
