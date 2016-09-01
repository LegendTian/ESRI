function convexhull(pointset) {
    function sort(ps) {
        return ps.sort(function(a, b) {
            if (a.x == b.x) {           
                return a.y - b.y;                           
            } else {                                                    
                return a.x - b.x;                                                           
            }                                                                                           
        });                                     
    };                      

    function cross(o, a, b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); 
    };                          

    pointset = sort(pointset);
    if (pointset.length <= 1) {
        return pointset;
    }   
    var lower = []; 
    for (var l = 0; l < pointset.length; l++) {
        while (lower.length >= 2 && (cross(lower[lower.length - 2], lower[lower.length - 1], pointset[l]) <= 0)) {
            lower.pop();
        }   
        lower.push(pointset[l]);
    }   
    var upper = []; 
    var reversed = pointset.reverse();
    for (var u = 0; u < reversed.length; u++) {
        while (upper.length >= 2 && (cross(upper[upper.length - 2], upper[upper.length - 1], reversed[u]) <= 0)) {
            upper.pop();
        }   
        upper.push(reversed[u]);
    }   
    upper.pop();
    lower.pop();
    return lower.concat(upper);
}