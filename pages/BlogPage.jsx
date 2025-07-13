import Head from 'next/head'
import Link from 'next/link'
import BlogSection from '@/components/BlogSection.jsx'
import { ArrowLeft, BookOpen } from 'lucide-react'

const BlogPage = () => {
  const pageTitle = "Blog o nauce języków - Akademia Poliglotki"
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Blog o <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">językach</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Praktyczne porady, ciekawostki kulturowe i motywacja do nauki języków obcych. 
              Odkryj sekrety skutecznej nauki!
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <BlogSection />
    </div>
  )
}

export default BlogPage