export async function getCandidatesByPostedDate(postedDate: number) {
  const res = await fetch(
    'https://os.hellojob.jp/hellojobv5-recruitment-crawled/_search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.ELASTICSEARCH_USERNAME}:${process.env.ELASTICSEARCH_PASSWORD}`).toString('base64')
      },
      body: JSON.stringify({
        size: 1000,
        query: {
          term: {
            postedDate
          }
        }
      })
    }
  );

  if (!res.ok) {
    throw new Error(`OpenSearch request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.hits.hits.slice(0, 10).map((item) => item._source);
}