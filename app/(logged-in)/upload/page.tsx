import UploadHeader from "@/components/upload/upload-header"
import UploadForm from "@/components/upload/upload-form"

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
            <section className="container mx-auto px-4 pt-20">
                <UploadHeader />
                <UploadForm />
            </section>
        </div>
    )
}