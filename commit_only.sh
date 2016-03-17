echo "Enter your comments: "
read comment
git add .
git commit -am "`date`: $comment"
git status
