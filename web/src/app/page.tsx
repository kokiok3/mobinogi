
const temp = async () => {
  console.log('temp')
  const response = await fetch('http://localhost:8000');
  console.log('response: ', response)
  const data = await response.text();
  return data;
}
export default async function Home() {
  const data = await temp()
  console.log('data: ', data)

  return (
    <div>
      <h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1><h1 className="text-9xl font-bold  underline">HI</h1>
      <h1 className="text-9xl font-bold  underline">HI</h1>
    </div>

  )
}
