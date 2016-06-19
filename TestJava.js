/**
 * Created by kyle on 6/18/16.
 */
$.ajax({
    type: "GET",
    dataType: "json",
    url: "http://flytpod:9090/ros/flytpod/mavros/battery",
    success: function(data){
        document.write(data);
    }
});