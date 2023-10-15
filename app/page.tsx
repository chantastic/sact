export default function Home() {
  return (
    <>
      <header className='flex justify-center text-4xl'>Sact 🍒</header>
      <main className='flex portrait:flex-col landscape:flex-row h-full mt-8 justify-around'>
        <div className='flex justify-center'>
          <ol className='grid justify-items-center items-center grid-cols-5 grid-rows-4 max-h-[12rem] max-w-[16rem]'>
            {Array(19)
              .fill(null)
              .map((evacuation, i) => {
                return (
                  <li
                    aria-label={`Evacuation ${i + 1} of 20. Incomplete`}
                    className='text-md'
                  >
                    ⚪️
                  </li>
                )
              })}
            <li>
              <span
                className='text-6xl'
                aria-label='Final evacuation. Capture and deliver to lab.'
              >
                🧪
              </span>
            </li>
          </ol>
        </div>
        <div className='flex flex-col'>
          <p className='flex justify-center py-8 text-2xl'>Only {19} left!</p>
          <div className='flex flex-row justify-center text-6xl width-full gap-4'>
            <button aria-label='Complete evacuation, with partner.'>✊</button>
            <button aria-label='Complete evacuation, with partner.'>😘</button>
            <button aria-label='Complete evacuation, prefer not to say.'>
              🫣
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
