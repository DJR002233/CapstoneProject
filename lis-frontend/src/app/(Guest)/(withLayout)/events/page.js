import Image from 'next/image'

export default function Events() {
    return (
        <div className="mx-5 mb-10 mt-5 max-w-screen-2xl text-black md:mx-20 2xl:mx-20">
            <span className="text-2xl font-bold">Events</span>
            <div className="mt-2 flex flex-col gap-y-2 lg:flex-row">
                <div className="mx-auto">
                    <Image
                        className="mx-auto"
                        src="/pictures/events/events1.jpg"
                        width={400}
                        height={400}
                        quality={0}
                        alt="Picture"
                    />
                    <p className="px-5 pt-10 text-justify">
                        Fun in the Sun! Our little athletes enjoy friendly
                        baseball games, developing teamwork, coordination, and
                        plenty of smiles along the way. Our daycare center
                        offers a variety of exciting events that foster growth,
                        creativity, and fun for children of all ages. From
                        friendly baseball games that promote teamwork and
                        physical activity to arts and crafts sessions that spark
                        imagination.
                    </p>
                </div>

                <div className="mx-auto">
                    <Image
                        className="mx-auto"
                        src="/pictures/events/events2.jpg"
                        width={300}
                        height={300}
                        quality={0}
                        alt="Picture"
                    />
                    <p className="px-5 pt-10 text-justify">
                        Each event is designed to engage and inspire. Whether
                        it’s outdoor sports, storytime, or seasonal
                        celebrations, our events provide children with the
                        opportunity to learn new skills, make lasting memories,
                        and enjoy time with friends in a safe and nurturing
                        environment.
                    </p>
                </div>
            </div>
        </div>
    )
}
