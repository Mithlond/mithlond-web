# 1. Mithlond: Web

The Mithlond: Web project contains development for the Mithlond website.
The website is built using AngularJS, Bootstrap, TypeScript, WebJars and Maven.

# 2. Getting and building mithlond-web

The mithlond-web is a normal Git-based Maven project. 
It is simple to get and build it. 

## 2.1. Getting the repository

Clone the repository, and fetch all tags:

```
git clone https://github.com/Mithlond/mithlond-web.git

cd mithlond-web

git fetch --tags
```

## 2.2. Building the project

For the latest development build, simply run the build against the latest master branch revision:  

```
mvn clean install
```

For a particular version, checkout its release tag and build normally:
 
```
git checkout mithlond-web-1.0.1

mvn clean install
```

All tags (and hence also all release versions) are visible using the command
 
```
git tag -l
```

### 2.2.1. Building with different Maven versions

For building the project with another Maven version, simply run the following 
script, where the `${MAVEN_VERSION}` should be substituted for a version number
such as `3.3.3`:
  
```
mvn -N io.takari:maven:wrapper -Dmaven=${MAVEN_VERSION}

./mvnw --show-version --errors --batch-mode validte dependency:go-offline

./mvnw --show-version --errors --batch-mode clean verify site
```

In the windows operating system, use `mvnw.bat` instead.