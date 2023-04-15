import "keen-slider/keen-slider.min.css";

interface GameBannerProps {
  id: string;
  bannerUrl: string;
  name: string;
  adsCount: number;
}

export const GameBanner = (props: GameBannerProps) => {
  return (
    <a href={`/game/${props.id}`} className='keen-slider__slide relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt="" />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'> {props.name}</strong>
        <span className='text-sm text-zinc-300 block'>{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}
