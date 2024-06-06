

it('GET API from http://localhost:8080/ should return 200', async()=>{
  const response = await fetch('http://localhost:8080');
  expect(response.status).toBe(200);
})
