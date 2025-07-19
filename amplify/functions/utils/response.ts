export const jsonResponse = (statusCode: number, data: any) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
    };
    return {
        statusCode,
        headers: corsHeaders,
        body: JSON.stringify(data),
    }
};
