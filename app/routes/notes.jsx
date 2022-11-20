import NewNote, { links as newNoteLinks} from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import {getStoredNotes, storeNotes} from "~/data/notes";
import {redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData()
    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}

export async function loader() {
    const notes = await getStoredNotes()
    return notes
}

export async function action({request}) {
    const formData = await request.formData()
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content')
    // }
    // TODO: Add validation
    const noteData = Object.fromEntries(formData)
    const existingNotes = await getStoredNotes()
    noteData.id = new Date().toISOString()
    // TODO: change it to better id generator
    const updatedNotes = existingNotes.concat(noteData)
    await storeNotes(updatedNotes)
    return redirect('/notes')
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]
}

