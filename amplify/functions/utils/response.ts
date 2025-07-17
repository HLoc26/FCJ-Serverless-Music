export const jsonResponse = (statusCode: number, data: any) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
});
