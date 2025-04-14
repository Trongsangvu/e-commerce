// const API_URL = process.env.ECOMMERCE_API_URL;

// export const apiFetch = async (endpoint: string, options: { headers?: Record<string, string> } = {}) => {
//     try {
//         const response = await fetch(`${API_URL}${endpoint}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add authorization token if available
//                 ...options.headers
//             },
//             ...options
//         });

//         if(!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }

//         return response.json();
//     } catch(error) {
//         console.error('API fetch failed:', error);
//     }
// }