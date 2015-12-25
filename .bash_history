vim www/js/apply.js 
git status 
rm .bash_history .viminfo 
git status 
time bash -c 'git add -A && git commit -m "About to release" && git push origin master '
ls -a
