// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true
// });

it('GET API from http://localhost:8080/ should return 200', async()=>{
  const response = await fetch('http://localhost:8080');
  expect(response.status).toBe(200);
})

// // Mock the external service call
// jest.mock('./index', () => ({
//     generatePoem: jest.fn().mockReturnValue({
//       poem: 'A beautiful day in the neighborhood.',
//       message: 'Poem generated successfully.'
//     }),
//   }));
  
//   describe('Generate Poem Endpoint', () => {
//     it('should generate a poem and insert it into the database', async () => {
//       const response = await fetch('http://localhost:8080/generate-poem');
//       const data = await response.json();
  
//       expect(data.poem).toBeDefined();
//       expect(data.message).toContain('Poem inserted with ID:');
//       // Assert that the mocked function was called
//       expect(openai.generatePoem).toHaveBeenCalled();
//     });
//   });
  