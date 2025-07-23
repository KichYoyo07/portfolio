    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <img
          src={project.image_url || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover object-center transition-all group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback si la imagen no carga
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
