import { 
    fetchGameAttributeDetails,
    updateGameAttributeAction
   } from '@/actions/attribute-actions';
  import FormContainer from '@/components/form/FormContainer';
  import FormInput from '@/components/form/FormInput';
  import { SubmitButton } from '@/components/form/Buttons';
  import CheckboxInput from '@/components/form/CheckboxInput';
  
  async function EditGameAttributePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const attribute = await fetchGameAttributeDetails(parseInt(id));
    const { name, shortname, isDefault } = attribute;

    return (
      <section>
        <h1 className='text-2xl font-semibold mb-8 capitalize'>update attribute</h1>
        <div className='border p-8 rounded'>
          <FormContainer action={updateGameAttributeAction}>
            <div className='grid gap-4 md:grid-cols-2 my-4'>
              <input type='hidden' name='id' value={id} />
              <FormInput
                type='text'
                name='name'
                label='product name'
                defaultValue={name}
              />
              <FormInput
                type='text'
                name='shortname'
                label='short name'
                defaultValue={shortname}
              />
            </div>
            <div className='mt-6'>
              <CheckboxInput
                name='isdefault'
                label='isdefault'
                defaultChecked={isDefault}
              />
            </div>
            <SubmitButton text='update game attribute' className='mt-8' />
          </FormContainer>
        </div>
      </section>
    );
  }
  export default EditGameAttributePage;
  