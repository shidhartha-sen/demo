export default function Post({title, author, content}) {
    return (
        <div>
            <h1>{title}</h1>
            <h3>By: {author}</h3>
            <p>{content}</p>
        </div>
    );
}