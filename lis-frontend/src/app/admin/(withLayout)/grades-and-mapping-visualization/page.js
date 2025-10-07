import '@/css/tableBorder.css'
import '@/css/shapes.css'
import '@/css/writing-mode.css'
import '@/css/bg-color.css'
import '@/css/border-color.css'
import '@/css/width.css'
import Grades from '@/pages/faculty/gradesandmappingvisualization/grades'
import SimpleTable from '@/app/_lib/simpletableview'
import Scaledscores from '@/pages/faculty/gradesandmappingvisualization/scaledscores'
import Scores from '@/pages/faculty/gradesandmappingvisualization/scores'
import Standardscores from '@/pages/faculty/gradesandmappingvisualization/standardscores'

export default function Graphs() {
    const className = {
            div: 'max-h-screen-60 mb-2 w-full overflow-x-auto overflow-y-auto bg-slate-300',
            table: 'w-full text-center',
            thead: 'sticky top-0 bg-color-yellow cursor-default',
            tbody: 'bg-white',
            tr: '',
            td: 'border-2 border-gray-500 h-8 bg-white cursor-pointer',
        },
        id = {
            table: 'child_information_table',
        }
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">
                Grades and Mapping Visualization
            </p>
            <Grades />
            <SimpleTable className={className} id={id} />
            <br />
            <Scores />
            <br />
            <Scaledscores />
            <br />
            <Standardscores />
            <br />
        </>
    )
}
