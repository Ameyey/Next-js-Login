
async function Userprofile({params}) {
  const { id } = await params;
  console.log(id)
 return (
    <div>
      <h1 className='flex flex-col items-center justify-center'>Profile  <span className="text-2xl ">{id}</span> </h1>
    </div>
  )
}

export default Userprofile
