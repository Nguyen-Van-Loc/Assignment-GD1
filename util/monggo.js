module.exports = {
    mutipleMongooesToObject: function (monggoss) {
        return monggoss.map(monggoss=>monggoss.toObject())
    },
    mongooestoObject:function(monggoss){
        return monggoss? monggoss.toObject():monggoss
    }
}