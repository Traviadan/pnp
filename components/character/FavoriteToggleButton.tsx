import { CardSignInButton } from '@/components/form/Buttons';
import { fetchFavoriteId } from '@/actions/favorite-actions';
import FavoriteToggleForm from './FavoriteToggleForm';
import { currentUser } from '@/lib/helper';

async function FavoriteToggleButton({ characterId }: { characterId: number }) {
  const user = await currentUser();
  if (!user) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ characterId });

  return <FavoriteToggleForm favoriteId={favoriteId} characterId={characterId} />;
}
export default FavoriteToggleButton;