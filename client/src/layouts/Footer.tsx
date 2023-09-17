import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center w-full bg-black">
      <div className="container w-full h-96 p-4 md:p-16">
        <h1 className="text-3xl">MonHool</h1>

        <div className="flex justify-between w-full md:w-[400px] mt-10">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl text-gray-400 mb-3">Product</h1>
            <Link href={'/staking'} className="text-primary text-lg md:text-xl my-1">Staking</Link>
            <Link href={'/trading-bot'} className="text-primary text-lg md:text-xl my-1">AI Trading Bot</Link>
            <Link href={'/'} className="text-primary text-lg md:text-xl my-1">Exchange</Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl text-gray-400 mb-3">Contact</h1>
            <Link href={'/'} className="text-primary text-lg md:text-xl my-1">Privacy & policy</Link>
            <Link href={'mailto:support@Monhool.com'} className="text-primary text-lg md:text-xl my-1">support@Monhool.com</Link>
            <Link href={'tel:+16654328898'} className="text-primary text-lg md:text-xl my-1">+1 665-432-8898</Link>
          </div>
        </div>
      </div>
    </div>
  )
}