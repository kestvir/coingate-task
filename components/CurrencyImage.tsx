import Image from "next/image";

type Props = {
  currency: string;
};

export default function CurrencyImage({ currency }: Props) {
  return (
    <Image
      width={25}
      height={25}
      src={`https://cryptoicon-api.vercel.app/api/icon/${currency.toLowerCase()}`}
    ></Image>
  );
}
