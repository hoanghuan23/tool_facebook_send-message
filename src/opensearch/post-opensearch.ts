export async function getCandidatesByPostedDate(
  postedDate: number,
  id_ctv: string,
  from = 0,
  size = 1000,
) {
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
        from,
        size,
        query: {
          bool: {
            must: [
              { term: { postedDate: postedDate } },
              { terms: { 'statusJourney.keyword': ['NEW', 'APPROACHED'] } },
              { term: { "broker.id.keyword": id_ctv } },
            ],
            must_not: [{ term: { isDeleted: true } }],
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

  const data = await res.json();
  return data.hits.hits.map((item) => ({
    _id: item._id,
    ...item._source,
  }));
}
