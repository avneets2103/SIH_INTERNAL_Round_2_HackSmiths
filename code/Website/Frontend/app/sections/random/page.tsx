import Modal from '@/components/Modal/Modal'
import React from 'react'
interface Props {}

function Page(props: Props) {
    const {} = props

    return (
        <>
        <Modal
        title="Dark Theme: 5 UI Design Tips"
        tldr="When designing dark themes, it's important to avoid pure black backgrounds, use legible fonts, adjust shadows to avoid harsh contrasts, avoid saturated colors to meet accessibility standards, and maintain consistency with the light theme. These principles help create a comfortable and visually appealing user experience."
        tags={["UX Design", "UI Design", "Dark Theme", "Accessibility"]}
        url="https://api.daily.dev/r/N05X7SQbc"
        />
        </>
    )
}

export default Page
