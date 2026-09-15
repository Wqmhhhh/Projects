class Xset extends Set {
  union(...sets){
    return Xset.union(this,...sets)
  }
  intersection(...sets){
    return Xset.intersection(this,...sets)
  }
  difference(set){
    return Xset.difference(this,set)
  }
  symmetricDifference(set){
    return Xset.symmetricDifference(this,set)
  }
  cartesianProduct(set){
    return Xset.cartesianProduct(this,set)
  }
  powerSet(){
    return Xset.powerSet(this)
  }

  // 返回两个值或更多值的并集
  static union(a,...bSets){
    const unionSet=new Xset(a)
    for(const b of bSets){
      for(const bValue of b){
        unionSet.add(bValue)
      }
    }
    return unionSet
  }

  // 返回两个或更多值的交集
  static intersection(a,...bSets){
    const intersectionSet=new Xset()
    for(const aValue of intersectionSet){
      for(const bValue of b){
        if(!b.has(aValue)){
          intersectionSet.delete(aValue)
        }
      }
    }
    return intersectionSet
  }

  //返回两个值的差集
  static difference(a,b){
    const differenceSet = new Xset(a)
    for(const bValue of b){
      if(a.has(bValue)){
        differenceSet.delete(bValue)
      }
    }
    return differenceSet
  }

  //返回两个集合的对称差集
  static symmetricDifference(a,b){
    // 按定义调用上面函数，对称差集可以表示为
    return a.union(b).difference(a.intersection(b))
  }

  //返回两个集合（数组对形式）的笛卡尔集
  //必须返回数组集合，因为笛卡尔集可能包含相同值的对
  static cartesianProduct(a,b){
    const cartesianProductSet=new Xset()
    for(const aValue of a){
      for(const bValue of b){
        cartesianProductSet.add([aValue,bValue])
      }
    }
    return cartesianProductSet
  }

  // 返回一个集合的幂集
  static powerSet(a){
    const powerSet=new Xset().add(new Xset())
    for(const aValue of a){
      for(const set of new Xset(powerSet)){
        powerSet.add(new Xset(set).add(aValue))
      }
    }
    return powerSet
  }
}