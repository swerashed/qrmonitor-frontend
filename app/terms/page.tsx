export default function TermsPage() {
    return (
        <div className="container py-20 max-w-4xl">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                        <p className="text-muted-foreground">
                            By accessing or using QrMonitor, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                        <p className="text-muted-foreground mb-4">
                            Permission is granted to temporarily download one copy of the materials (information or software) on QrMonitor's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on QrMonitor's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Service Availability</h2>
                        <p className="text-muted-foreground">
                            We strive to provide continuous availability of our service but do not guarantee 100% uptime. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
                        <p className="text-muted-foreground">
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
                        <p className="text-muted-foreground">
                            In no event shall QrMonitor or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on QrMonitor's website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                        <p className="text-muted-foreground">
                            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
