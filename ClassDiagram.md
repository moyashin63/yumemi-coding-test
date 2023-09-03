
```plantuml
class MainComponent{
    prefectures { 
        prefecture: Prefecture, 
        selected: boolean 
    }[]
    - addSelectedData()
    <PrefectureProvider>()
        <PrefectureList />()
        <Graph />()
    </PrefectureProvider>()
}

class PrefectureList{
}

class Graph{
    
}

class PrefectureProvider{
    prefectureContext
}

class API{
    getAllPrefectures()
}

```

これらすべてをuseContextでつなぐけど、
PrefectureListコンポーネントでgetAllPrefectures呼び出せんのか？