
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import { CharactersGrid } from '../character/CharactersGrid';
import { fetchUserFavorites } from '@/actions/favorite-actions';


export default async function FavoriteCharacters() {
  const favorites = await fetchUserFavorites();
  if (!favorites || favorites.length === 0) return <EmptyList />;

  return (
    <section className='pt-24'>
      <SectionTitle text='favorite characters' />
      <CharactersGrid params={{favorites: favorites}} />
    </section>
  );
}
