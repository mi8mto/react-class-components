import { MainPage } from '../../src/screens/MainPage/MainPage';
import { PokemonDetailsPage } from '../../src/screens/PokemonDetailsPage/PokemonDetailsPage';

type Props = {
  searchParams: Promise<{
    details?: string;
  }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <MainPage />
      {params.details && <PokemonDetailsPage />}
    </>
  );
}
