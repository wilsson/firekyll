[![npm version](https://badge.fury.io/js/firekyll.svg)](https://badge.fury.io/js/firekyll)
## firekyll

Use tool for quick Jekyll.

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