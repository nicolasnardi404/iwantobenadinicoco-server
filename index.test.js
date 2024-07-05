//ENDPOINTS

it("GET API from http://localhost:8080/ should return 200", async () => {
  jest.setTimeout(100000);
  const response = await fetch("http://localhost:8080");
  expect(response.status).toBe(200);
});

//#TODO - mock this function to make sure its not fully running and ading data to db

// describe('Generate Poem Endpoint', () => {
//   it('should generate a poem and insert it into the database', async () => {
//     const response = await fetch('http://localhost:8080/generate-poem');
//     const data = await response.json();
//     jest.setTimeout(100000);
//     expect(data.poem).toBeDefined();

//     expect(data.message).toContain('Poem inserted with ID:');

//   });
// });
