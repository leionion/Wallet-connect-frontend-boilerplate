import { Link } from 'wouter';

import Container from '@/components/Container';

const Nav = () => {
  return (
    <nav className="mb-12">
      <Container className="flex justify-between items-center py-4">
        <p>
          <Link href="/">
          <h5 className="text-2xl font-bold text-center text-orange-500 mb-20">
             Bitmap Community
            </h5>
          </Link>
        </p>
      </Container>
    </nav>
  )
}

export default Nav;