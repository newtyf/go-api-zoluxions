import apiClient from './index';

const getQRFactorization = async (matrix: number[][]) => {
  try {
    const response = await apiClient.post('/qr', {matrix});
    return response.data;
  } catch (error) {
    console.error('Error fetching QR data:', error);
    throw error;
  }
};

export { getQRFactorization };
