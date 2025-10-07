import Image from 'next/image'
import Link from 'next/link'
export default function Jumbotron() {
    return (
        <div className="px-5 py-10 text-black md:mx-20 lg:mx-32">
            <div className="mx-auto w-full 2xl:flex">
                <Image
                    className="mx-auto"
                    src="/pictures/home-page/home1.jpg"
                    width={650}
                    height={400}
                    // placeholder="blur"
                    quality={0}
                    // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAw1BMVEVeiXm0eG2OhoJ6enpvk4VNeml/n5mxg3y7qKfKz9VpiXyynZxoeG6FpqCmt62GjYSfdW9tYFZunaKllYh8jY+5oqClcmeWb2qBeXSEmoW5ub6IkpSZaly2r6xSgW6jvb12mJCPooKLoaC7lpKhfXhlenS8trenfXiptbBwbGmAhXiOp7dQttZQgnKKf3yRi5SypqahlZeblIWXoZhjm6aBk6KEandejpl3jZJ3d2yZZVzMzMnKyM1pX2akiYZ5amPKyMwhx3GSAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAb0lEQVQI1wXBBQKCQAAEwCXvju5GwQADTDBAlP+/yhk0jqjrslwsRTidAngKpAW85x0tvzJKCUNs9LEpHNwtgvR1vl1Oe1tDNKVvm/oVr+Hx+8wJ29R0hzFnPmUkUE3kWfK9rjmiHuFmoRVZHAmFPxf4Cew2bUr6AAAAAElFTkSuQmCC"
                    alt="Picture"
                />
                <section className="mx-auto mt-8 w-fit rounded-xl bg-blue-200 p-5 lg:mt-10 2xl:ms-20 2xl:mt-0">
                    <p className="mx-auto mb-6 w-fit sm:w-2/3 2xl:mx-0 2xl:w-auto">
                        <span className="w-fit text-left text-3xl lg:text-4xl">
                            Putatan Child Development Center
                        </span>
                        <br />
                        <br />
                        <span className="text-justify lg:w-8/12 xl:w-1/2">
                            We help nurture your childrens growth by giving them
                            an environment to be able to grow smoothly and good.
                            <br />
                            <br />
                            CamSure Daycare center is a place where children can
                            improve their growth and develop their mindset to be
                            more creative and to be raised with proper value and
                            good behavior.
                            <br />
                            <br />
                            to know enroll your child to our daycare, click the
                            Register now button below to register!
                            <br />
                            <br />
                            <br />
                        </span>
                        <Link
                            href="/available-locations"
                            className="w-fit rounded-md border bg-blue-500 px-3 py-3 text-white 2xl:mx-0"
                        >
                            Register now
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    )
}
