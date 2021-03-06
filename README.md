[![npm version](https://badge.fury.io/js/firekyll.svg)](https://badge.fury.io/js/firekyll)

## firekyll

firekyll, it was intended to streamline the use of Jekyll gem.

#### requires

You need to install [ruby][2] and gem [Jekyll][3].

if you do not have installed.

#### for windows

- [rubyinstaller][4]
- [Jekyll][3]

```bash
gem install jekyll
```

#### for linux

```bash
sudo apt-get install ruby
```

```bash
sudo gem install ruby
```

firekyll, done with versions:

###### ruby

```bash
ruby -v
ruby 2.2.3
```

###### jekyll

```bash
jekyll -v
jekyll 2.5.3
```

#### Install

```bash
sudo npm install firekyll -g
```

## Commands

#### new

To create a new project gives you 2 options.

 - Create simple with gem jekyll.
 - Create simple with gem jekyll and (gulp + browserSync + express + sass), using [firekyll-generator-gulp-webapp][1]


```bash
$ fk new [name]
```

#### newpost

You create a new post with the format required for Jekyll , in the folder **_posts**.

```bash
$ fk newpost [name]
```

#### list

Will list all created posts indicating the weight and the name.

```bash
$ fk list [name]
```

#### server

Create a server using the Jekyll gem.

```bash
$ fk server [name]
```

#### build

Copilar the project with the Jekyll gem.

```bash
$ fk build [name]
```

[1]:https://www.npmjs.com/package/firekyll-generator-gulp-webapp
[2]:https://www.ruby-lang.org/es/
[3]:https://jekyllrb.com/
[4]:http://rubyinstaller.org/