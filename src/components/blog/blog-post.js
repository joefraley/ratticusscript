import React from 'react'
import Moment from 'moment'

import { createMarkup, getPost } from '../../utilities.js'

import CSS from './styles.scss'

export const BlogTags = props => {
  return <p className={ CSS.tags }>tagged: { props.tags }</p>
}

export const BlogPost = props => {
  const post = getPost(props.params.id)
  const { attributes: meta } = post.meta
  const date = Moment(meta.date).calendar()

  return <article>
    {/* Blog metadata */}
    <div className={ CSS.meta }>
      <h1 className={ CSS.title }>{ meta.title }</h1>
      <time className={ CSS.date }>{ date }</time>
    </div>
    <hr></hr>

    {/* Actual blog content */}
    <div dangerouslySetInnerHTML={ createMarkup(post.content) }></div>
    <BlogTags tags={ meta.tags } />
  </article>
}
