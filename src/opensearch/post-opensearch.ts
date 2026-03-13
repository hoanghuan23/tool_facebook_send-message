export async function getCandidatesByPostedDate(postedDate: number) {
  const res = await fetch(
    'https://os.hellojob.jp/hellojobv5-recruitment-crawled/_search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.ELASTICSEARCH_USERNAME}:${process.env.ELASTICSEARCH_PASSWORD}`,
          ).toString('base64'),
      },
      body: JSON.stringify({
        size: 1000,
        query: {
          bool: {
            must: [
              { term: { postedDate } },
              { terms: { 'statusJourney.keyword': ['NEW', 'APPROACHED'] } },
            ],
          },
        },
        sort: [{ createdDate: { order: 'desc' } }],
      }),
    },
  );
  

  if (!res.ok) {
    throw new Error(
      `OpenSearch request failed: ${res.status} ${res.statusText}`,
    );
  }

  // slice(0, 10) giới hạn lấy 10 ứng viên
  const data = await res.json();
  return data.hits.hits.slice(0, 15).map((item) => ({
    _id: item._id,
    ...item._source,
  }));
}
