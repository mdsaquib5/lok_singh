import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href={'/'} className='logo'>
            <Image src={'/logo.png'} alt="Lok Logo" width={471} height={464} priority />
        </Link>
    )
}

export default Logo;