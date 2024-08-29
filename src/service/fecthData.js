const URL = 'http://localhost:3000/api';

export async function fetchGet(searchFor) {
  try {
    const response = await fetch(`${URL}?searchFor=${encodeURIComponent(searchFor)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
