function CategoryCard({ icon, title, description }) {
  return (
    <article className="category-card">
      <div className="category-icon">
        <i className={`bi ${icon}`}></i>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  )
}

export default CategoryCard