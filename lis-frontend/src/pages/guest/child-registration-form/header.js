import Image from 'next/image'
import Link from 'next/link'
export default function Header() {
    return (
        <div>
            <div className="flex items-center">
                <Link
                    className="me-1 w-full max-w-32 2xl:me-0"
                    href="/available-locations"
                >
                    <button className="w-full max-w-32 rounded-md border-4 border-blue-400 bg-blue-500 text-white">
                        Back
                    </button>
                </Link>
                <Image
                    className="mx-auto my-auto w-1/6 max-w-28"
                    src="/pictures/registration-form/logo.png"
                    width={125}
                    height={125}
                    placeholder="blur"
                    quality={0}
                    blurDataURL="none"
                    alt="2x2 Picture"
                />
                <p className="text-center">
                    Republika ng Pilipinas Pamahalaang Lungsod ng Muntinlupa
                    Social Services Department <br />
                    <strong>Early Childhood Education Division</strong>
                </p>
                <Image
                    className="mx-auto my-auto w-1/3 max-w-60"
                    src="/pictures/registration-form/dswd_logos.png"
                    width={250}
                    height={200}
                    placeholder="blur"
                    quality={0}
                    blurDataURL="none"
                    alt="2x2 Picture"
                />
            </div>
        </div>
    )
}
