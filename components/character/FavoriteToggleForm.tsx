'use client';

import FormContainer from '@/components/form/FormContainer';
import { toggleFavoriteAction } from '@/actions/favorite-actions';
import { CardSubmitButton } from '@/components/form/Buttons';

type FavoriteToggleFormProps = {
  characterId: number;
  favoriteId: number | null;
};

function FavoriteToggleForm({
  characterId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const toggleAction = toggleFavoriteAction.bind(null, {
    characterId,
    favoriteId
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;