

export async function updateCandidateStatus(id: string, status: string) {
  const res = await fetch(
    `https://os.hellojob.jp/hellojobv5-recruitment-crawled/_update/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.ELASTICSEARCH_USERNAME}:${process.env.ELASTICSEARCH_PASSWORD}`
          ).toString('base64'),
      },
      body: JSON.stringify({
        doc: {
          statusJourney: status,
          lastViewedTime: Date.now(),
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Update failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
