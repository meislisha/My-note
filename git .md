### 1.取消修改
	1.	取消没有git add 到暂存区的代码
		1. 取消修改的文件（并没有git add 到暂存区）
		git checkout ./ -- filename		
	    2. 取消新增的文件（并没有git add 到暂存区）
			单个文件、文件夹
				$ rm filename(单个文件) /rm dir -rf
			所有文件、文件夹
				$ git clean -xdf
	3. 本地修改/新增了一堆文件，已经git add到暂存区，想放弃修改
		1. 单个文件、文件夹
			$ git reset HEAD filename
		2. 所有文件、文件夹
			$ git reset HEAD .
	4. 本地通过git add & git commit 之后，想要撤销此次commit
		1. $ git reset commit_id (这个id是你想要回到的那个节点，可以通过git log查看，可以只选前6位)
		2. // 撤销之后，你所做的已经commit的修改还在工作区！
			$ git reset --hard commit_id(这个id是你想要回到的那个节点，可以通过git log查看，可以只选前6位)
			// 撤销之后，你所做的已经commit的修改将会清除，仍在工作区/暂存区的代码不会清除！
		3. 清除

### 2.分支
	1. git checkout -b dev 创建并切换到dev分支
		相当于： git branch dev
				git checout dv
	2. git merge dev(在master分支下) 合并dev到master
	3. git push -u origin dev
### 3. git  tag

​	git tag 给当前分支打标签；

​	其实道理和commit 的commit-sha1有些相似，其实就是给当前的版本做个标记，以便回退到此版本。如果使用commit-sha1，大家记不住那条冗长的sha1码，所以用tag标签来做记录。

​	发布一个版本时，我们通常现在版本库中打一个标签tag

​	git tag <name>就可以打一个新标签

分支合并master后，开发负责人对分支打上tag,tag名称为分支名称，并删除已合并分支

```
//打上tag标签
gut checkout master
git pull
git tag tag-release/190801
git push origin tag-release/190801
```

#### 4. git fetch 和gitpull的区别，

git fetch:拉取远程最新的代码，但是不影响本地的代码，即不进行merge 

git fetch -p： 删除不存在的远程跟踪分支

git branch -d feature/190801 删除分支

和git pull的区别：git pull 会merge

#### 5. 忽略本地跟踪

```
git update-index --assume-unchanged config/index.js 可以忽略跟踪config/index.js文档的修改，避免提交代码冲突
```

远程仓库  git remote add origin   giturl