import Container from '../global/Container';
import LinksDropdown from './LinksDropdown';
import Logo from './Logo';

function Navbar() {
  return (
    <nav className='border-b'>
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;